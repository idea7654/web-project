from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views
from django.conf.urls import url

from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()
router.register('posts', views.PostViewSet) # 메인에 묶여있음
router.register(r'comment', views.CommentOnlyViewSet) # 댓글 목록
router.register(r'images', views.ImgOnlyViewSet) # 다중이미지 
#router.register('comm', views.CommentPost) 

urlpatterns = [
    path('', include(router.urls)),
    path('list/', views.ListPost.as_view()), # 글목록
    path('list/<int:pk>/', views.DetailPost.as_view()), # 글내용

    path('comment/<int:comment_id>/submit/', views.choices_view), # 댓글쓰기 HTTP Method (GET, PUT, POST, DELETE등등)의 행위가 URI 표현으로 들어가서는 안된다. 
    path('reply/<int:comment_id>/', views.choices_view),

    # 카테고리
    path('category/', views.CategoryViewSet.as_view()),
    url(r'^category/(?P<id>\d+)/$', views.CategorySearchViewSet.as_view()), # 카테고리 목록 url

    # path('list/recent/', views.RecentPostViewSet.as_view()), # 최신데이터 목록 
    #path('img/id/', views.PostImageDetail.as_view()),          
    #path('img/', views.PostImageSerializer.as_view()),          # 다중이미지 테스트 url  

    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    

