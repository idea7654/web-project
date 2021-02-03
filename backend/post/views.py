from rest_framework.filters import SearchFilter
from django.shortcuts import get_object_or_404, render

from rest_framework.response import Response

from rest_framework.decorators import api_view
from rest_framework import viewsets, generics, status
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView

from .permissions import IsAuthorOrReadonly, IsAuthenticated
from .models import Post, PostImage, Category, Comment
from .serializers import CommentlistSerializer, PostSerializer, CategorySerializer, ImgOnlySerializer


# 검색전용? 밑에 포스트뷰랑 합체시도바람
class ListPost(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    # 필터검색  DBMS 의 LIKE/ILIKE 조건절을 통해 검색 
    filter_backends = [SearchFilter]
    search_fields = ['title','content','pname']

#  조회 수정 삭제 포스트뷰셋이랑겹침 
class DetailPost(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

# 게시글생성
class PostWrite(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    permission_classes = [
        IsAuthenticated,
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# 비회원 모든 게시글및 댓글조회 회원 수정삭제
class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    permission_classes = [
        IsAuthorOrReadonly,
    ]

# 다중이미지 
class ImgOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.all()
    serializer_class = ImgOnlySerializer

# 카테고리 설정
class CategoryViewSet(APIView):
    def get(self, request, format=None):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)
        
# 카테고리별 목록
class CategorySearchViewSet(APIView):
    def get(self, request, id, format=None):
        queryset = Post.objects.filter(category__id=id)
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)

# 댓글쓰기
@api_view(['POST'])
def choices_view(request, comment_id):
    post = get_object_or_404(Post, pk=comment_id)
    serializer = CommentlistSerializer(data=request.data)
    if serializer.is_valid():
        comment = serializer.save(comment=post)
        return Response(CommentlistSerializer(comment).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# # 게시글 id별 댓글목록
# class CommentOnlyViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = Post.objects.all()
#     serializer_class = BoardOnlySerializer

#  # (parent=None)으로 중복제거
# class CommentPost(viewsets.ModelViewSet):
#     queryset = Comment.objects.filter(parent=None)
#     serializer_class = CommentSerializer
    
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
