
from django.utils import timezone
from rest_framework import serializers
from .models import Brand, Post, PostImage, Category, Comment
from rest_framework.serializers import ReadOnlyField

# 다중이미지 
class PostImageSerializer(serializers.ModelSerializer):
   class Meta:
        model = PostImage
        fields = ('image',)

# 댓글 답글
class CommentSerializer(serializers.ModelSerializer):
    reply = serializers.SerializerMethodField()
    up = serializers.SerializerMethodField()
    down = serializers.SerializerMethodField()
    username = ReadOnlyField(source='comment_user.username')
    total = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = '__all__'

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)

    def get_up(self, obj):
        return obj.upUser.count()

    def get_down(self, obj):
        return obj.downUser.count()
    
    # 모델로 넣거나 리팩토링 필요해보임 
    def get_total(self, obj):
        result = obj.upUser.count() - obj.downUser.count()
        return result

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
            'brand',
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
       
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.pname = validated_data.get('pname', instance.pname)
        instance.category = validated_data.get('category', instance.category)
        instance.brand = validated_data.get('brand', instance.brand)

        try:
            images_data = self.context.get('request').data.pop('img')
        except:
            images_data = None

        if images_data is not None:
            image_instance_list = []
            for image_data in images_data:
                image, created = PostImage.objects.get_or_create(image=image_data)
                image_instance_list.append(image)

            instance.img.set(image_instance_list)

        instance.save()  
        return instance
    
    # # 멀티이미지 삽질 ver. related_name='img'
    # def get_img(self, obj):
    #     parent_comments = obj.imgkey.all()
    #     serializer = PostImageSerializer(parent_comments, many=True)
    #     return serializer.data


# 카테고리
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'
        
# # 댓글쓰기에 묶여있음 위에꺼랑 합쳐도될거같은데 추후수정
# class CommentlistSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = '__all__'

#     def create(self, validated_data):
#         return Comment.objects.create(**validated_data)

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