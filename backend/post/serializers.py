from rest_framework import serializers
from .models import Post, PostImage, Category, Comment


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'
  
class PostImageSerializer(serializers.ModelSerializer):
   class Meta:
        model = PostImage
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
   class Meta:
        model = Comment
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = (
            'id',
            'owner',
            'category',
            'title',
            'pname',
            'content',
            'star',
            'images',
            'imgurl',
            'cdate',
            'comments',
        )
        
    def create(self, validated_data):
       images_data = self.context['request'].FILES
       post = Post.objects.create(**validated_data)
       for image_data in images_data.getlist('image'):
           PostImage.objects.create(post=post, image=image_data)
       return post


class BoardOnlySerializer(serializers.ModelSerializer):
    parent_comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'parent_comments')

    def get_parent_comments(self, obj):
        parent_comments = obj.comments.filter(parent=None)
        serializer = CommentSerializer(parent_comments, many=True)
        return serializer.data

class ImgOnlySerializer(serializers.ModelSerializer):
    parent_comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'parent_comments')

    def get_parent_comments(self, obj):
        parent_comments = obj.commentss.filter(parentt=None)
        serializer = PostImageSerializer(parent_comments, many=True)
        return serializer.data