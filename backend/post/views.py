from rest_framework.viewsets import ModelViewSet
from django.shortcuts import render
from rest_framework import generics

from .models import Post, PostImage, Category
from .serializers import PostImageSerializer, PostSerializer,CategorySerializer
from rest_framework.response import Response
from rest_framework.views import APIView

class ListPost(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class DetailPost(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostViewSet(ModelViewSet):
   queryset = Post.objects.all()
   serializer_class = PostSerializer

# 카테고리 설정
class CategoryViewSet(APIView):
    def get(self, request, format=None):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)

class CategorySearchViewSet(APIView):
    def get(self, request, id, format=None):
        queryset = Post.objects.filter(category__id=id)
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)

class PostImageSerializer(generics.ListAPIView):
        queryset = PostImage.objects.all()
        serializer_class = PostImageSerializer

# # 최신글 x개
# class RecentPostViewSet(APIView):
#     def get(self, request, format=None):
#         queryset = Post.objects.all().order_by('-cdate')[0:3]
#         serializer = PostSerializer(queryset, many=True)
#         return Response(serializer.data)
