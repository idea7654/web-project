from rest_framework.viewsets import ModelViewSet
from django.shortcuts import render
from rest_framework import generics

from .models import Post, PostImage
from .serializers import PostImageSerializer, PostSerializer

class ListPost(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class DetailPost(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostViewSet(ModelViewSet):
   queryset = Post.objects.all()
   serializer_class = PostSerializer