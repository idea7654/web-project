from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views
from django.conf.urls import url

from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()
router.register('posts', views.PostViewSet)
#router.register('comment', views.CommentPost)
router.register(r'comment', views.CommentOnlyViewSet)
router.register(r'images', views.ImgOnlyViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('list/', views.ListPost.as_view()),
    path('list/<int:pk>/', views.DetailPost.as_view()),


    # 카테고리
    path('category/', views.CategoryViewSet.as_view()),
    url(r'^category/(?P<id>\d+)/$', views.CategorySearchViewSet.as_view()), # 카테고리 목록 url

    # path('list/recent/', views.RecentPostViewSet.as_view()), # 최신데이터 목록 
    #path('img/id/', views.PostImageDetail.as_view()),          
    #path('img/', views.PostImageSerializer.as_view()),          # 다중이미지 테스트 url  

    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


    

