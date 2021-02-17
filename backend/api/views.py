from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from .serializers import (
    CreateUserSerializer,
    UserSerializer,
    LoginUserSerializer, UsernameUniqueCheckSerializer,
)
from knox.models import AuthToken
from django.contrib.auth.models import User



class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        if len(request.data["username"]) < 6 or len(request.data["password"]) < 4:
            body = {"message": "short field"}
            return Response(body, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UsernameUniqueCheck(generics.CreateAPIView): 
    serializer_class = UsernameUniqueCheckSerializer
    def post(self, request, format=None): 
        serializer = self.get_serializer(data=request.data, context={'request': request}) 
        if serializer.is_valid(): 
            return Response(data={'detail':['You can use this ID']}, status=status.HTTP_200_OK) 
        else: 
            detail = dict() 
            detail['detail'] = serializer.errors['username'] 
        return Response(data=detail, status=status.HTTP_400_BAD_REQUEST)