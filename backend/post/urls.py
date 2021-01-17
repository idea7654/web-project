from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views


router = DefaultRouter()
router.register('posts', views.PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('list/', views.ListPost.as_view()),
    path('<int:pk>/', views.DetailPost.as_view()),
]

