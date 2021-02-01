
from django.utils import timezone
from rest_framework import serializers
from .models import Post, PostImage, Category, Comment


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'
  
class PostImageSerializer(serializers.ModelSerializer):
   class Meta:
        model = PostImage
        fields = ('post','image')

class CommentSerializer(serializers.ModelSerializer):
   class Meta:
        model = Comment
        fields = '__all__'



class PostSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    star = serializers.SerializerMethodField('scoresAverage') #댓글 별점 평균


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
            'images',
            'imgurl',
            'cdate',
            'comments',
            'star',
        )

    
    def create(self, validated_data):
       images_data = self.context['request'].FILES
       post = Post.objects.create(**validated_data)
       for image_data in images_data.getlist('image'):
           PostImage.objects.create(post=post, image=image_data)
       return post

# 댓글
class BoardOnlySerializer(serializers.ModelSerializer):
    parent_comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'parent_comments')

    def get_parent_comments(self, obj):
        parent_comments = obj.comments.filter(parent=None)
        serializer = CommentSerializer(parent_comments, many=True)
        return serializer.data

# 다중이미지
class ImgOnlySerializer(serializers.ModelSerializer):
    parent_comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'parent_comments')

    def get_parent_comments(self, obj):
        parent_comments = obj.imgkey.filter(parents=None)
        serializer = PostImageSerializer(parent_comments, many=True)
        return serializer.data

class CommentlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)
