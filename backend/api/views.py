
from django.contrib.auth.models import User
from rest_framework import permissions, viewsets, generics

from .models import Note

from .serializers import NoteSerializer, UserSerializer

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        user = self.request.user
        if serializer.is_valid():
            serializer.save(author=user)
        else:
            return serializer.errors


class NoteDestroy(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)


class NoteUpdate(generics.UpdateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(author=self.request.user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


