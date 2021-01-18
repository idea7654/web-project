from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=40, null=False)

    def __str__(self):
        return self.name

class Post(models.Model):   
    title = models.CharField(max_length=200)                             # 제목
    pname = models.CharField(max_length=200, null=True)                 # 상품명
    content = models.TextField()                                     # 내용
    star = models.PositiveSmallIntegerField(default=5, null=False) #별점 기본값 5설정
    owner = models.ForeignKey(User,on_delete=models.CASCADE, blank=True, null=True) # 회원 아이디 키값 
    cdate = models.DateTimeField(auto_now_add=True)             # 업로드날짜
    imgurl = models.ImageField(blank=True, null=True)           # 대표이미지
    category = models.ForeignKey(Category, null=False, on_delete=models.CASCADE)

    def __str__(self):
        """A string representation of the model."""
        return self.title

class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)        # 게시글 이미지매칭 키
    image = models.ImageField(blank=True, null=True)            # 이미지
