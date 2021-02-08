from django.contrib import admin

from .models import Post, PostImage, Category, Comment, Like, DisLike

class PhotoInline(admin.TabularInline):
    model = PostImage

# Post 클래스는 해당하는 Photo 객체를 리스트로 관리하는 한다. 
class PostAdmin(admin.ModelAdmin):
    inlines = [PhotoInline, ]

# Register your models here.
admin.site.register(Post, PostAdmin)
admin.site.register(Category)

class upInline(admin.TabularInline):
    model = Like
class downInline(admin.TabularInline):
    model = DisLike
class CommentAdmin(admin.ModelAdmin):
    inlines = [upInline, downInline]

admin.site.register(Comment, CommentAdmin)
admin.site.register(Like)
admin.site.register(DisLike)

