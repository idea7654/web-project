from rest_framework.viewsets import ModelViewSet
from django.shortcuts import render
from rest_framework import generics
from rest_framework.filters import SearchFilter
from rest_framework import viewsets

from .models import Post, PostImage, Category, Comment
from .serializers import PostImageSerializer, PostSerializer,CategorySerializer, CommentSerializer, BoardOnlySerializer, ImgOnlySerializer
from rest_framework.response import Response
from rest_framework.views import APIView

class ListPost(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    # 필터검색  DBMS 의 LIKE/ILIKE 조건절을 통해 검색 
    filter_backends = [SearchFilter]
    search_fields = ['title','content','pname']

class DetailPost(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CommentPost(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
class CommentOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.all()
    serializer_class = BoardOnlySerializer

class ImgOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.all()
    serializer_class = ImgOnlySerializer

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





# 다중이미지 테스트중
# class PostImageSerializer(generics.ListAPIView):
#         queryset = PostImage.objects.all()
#         serializer_class = PostImageSerializer

# 다중이미지 포스트에매칭시켜 불러오기 테스트
# class PostImageDetail(generics.ListAPIView):
#         queryset = PostImage.objects.filter(post_id=5)
#         serializer_class = PostImageSerializer

# # 최신글 x개
# class RecentPostViewSet(APIView):
#     def get(self, request, format=None):
#         queryset = Post.objects.all().order_by('-cdate')[0:3]
#         serializer = PostSerializer(queryset, many=True)
#         return Response(serializer.data)
