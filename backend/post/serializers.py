from rest_framework import serializers
from .models import Post, PostImage, Category


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'
  
class PostImageSerializer(serializers.ModelSerializer):
   class Meta:
        model = PostImage
        fields = ('image', 'post',)


class PostSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True, read_only=True)
  

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
            
        )
        
    def create(self, validated_data):
       images_data = self.context['request'].FILES
       post = Post.objects.create(**validated_data)
       for image_data in images_data.getlist('image'):
           PostImage.objects.create(post=post, image=image_data)
       return post


