
from django.utils import timezone
from rest_framework import serializers
from .models import Post, PostImage, Category, Comment
from rest_framework.serializers import ReadOnlyField

# 다중이미지 
class PostImageSerializer(serializers.ModelSerializer):
   class Meta:
        model = PostImage
        fields = ('image',)

# 댓글 답글
class CommentSerializer(serializers.ModelSerializer):
    reply = serializers.SerializerMethodField()
    username = ReadOnlyField(source='comment_user.username')

    class Meta:
        model = Comment
        fields = '__all__'

    def get_reply(self, instance):
    	# recursive
        serializer = self.__class__(instance.reply, many=True)
        serializer.bind('', self)
        return serializer.data


class PostSerializer(serializers.ModelSerializer):
    img = PostImageSerializer(many=True, required=False)
    comments = serializers.SerializerMethodField() 
    owner_username = ReadOnlyField(source='owner.username') # 작성자 아이디표시
    star = serializers.SerializerMethodField('scoresAverage') #댓글 별점 평균
    #img = serializers.SerializerMethodField() # 멀티이미지 표시

    # 댓글 평균
    def scoresAverage(self, obj):
        length = obj.comments.count()
        if length != 0:
            total = 0
            for comment in obj.comments.all():
                total += comment.cstar
            result = round(total/length, 2)
        else:
            result = 0
        return result

    class Meta:
        model = Post
        fields = (
            'id',
            'owner',
            'category',
            'title',
            'pname',
            'content',
            'cdate',
            'star',
            'owner_username',
            'img',
            'comments',
        )

        
    # 코멘트목록 답글 중복을없애기위해 parent=None 으로 설정
    def get_comments(self, obj):
        parent_comments = obj.comments.filter(parent=None)
        serializer = CommentSerializer(parent_comments, many=True)
        return serializer.data
    
    # 다중이미지 post
    def create(self, validated_data):
       images_data = self.context['request'].FILES
       post = Post.objects.create(**validated_data)
       for image_data in images_data.getlist('image'):
           PostImage.objects.create(post=post, image=image_data)
       return post

    def update(self, instance, validated_data):
        """
        Handle writable nested serializer to update the current post.
        :param instance: current Post model instance
        :param validated_data: validated data, by serializer class's validate method
        :return: updated Post model instance
        """
        # TODO: change the definition to make it work same as create()

        '''
        overwrite post instance fields with new data if not None, else assign the old value
        '''
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.pname = validated_data.get('pname', instance.pname)
        # instance.updated_at = validated_data.get('updated_at', instance.updated_at)  # no need to update; auto_now;

        try:

            '''
            Fetching `images` list of image files explicitly from context.
            Because using default way, value of `images` received at serializers from viewset was an empty list.
            However value of `images` in viewset were OK.
            Hence applied this workaround.   
            '''
            images_data = self.context.get('request').data.pop('img')
        except:
            images_data = None

        if images_data is not None:
            image_instance_list = []
            for image_data in images_data:
                image, created = PostImage.objects.get_or_create(image=image_data)
                image_instance_list.append(image)

            instance.img.set(image_instance_list)

        instance.save()  # why? see base class code; need to save() to make auto_now work
        return instance
    
    # # 멀티이미지 삽질 ver. related_name='img'
    # def get_img(self, obj):
    #     parent_comments = obj.imgkey.all()
    #     serializer = PostImageSerializer(parent_comments, many=True)
    #     return serializer.data

# 댓글쓰기에 묶여있음 위에꺼랑 합쳐도될거같은데 추후수정
class CommentlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)

# 카테고리
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        

# # 다중이미지
# class ImgOnlySerializer(serializers.ModelSerializer):
#     parent_comments = serializers.SerializerMethodField()

#     class Meta:
#         model = Post
#         fields = ('id', 'parent_comments')

#     def get_parent_comments(self, obj):
#         parent_comments = obj.imgkey.filter(parents=None)
#         serializer = PostImageSerializer(parent_comments, many=True)
#         return serializer.data

# # 댓글
# class BoardOnlySerializer(serializers.ModelSerializer):
#     parent_comments = serializers.SerializerMethodField()

#     class Meta:
#         model = Post
#         fields = ('id', 'parent_comments')

#     def get_parent_comments(self, obj):
#         parent_comments = obj.comments.filter(parent=None)
#         serializer = CommentSerializer(parent_comments, many=True)
#         return serializer.data