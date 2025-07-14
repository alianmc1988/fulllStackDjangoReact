
from django.urls import path
from . import views


urlpatterns = [
    path('note/', views.NoteListCreate.as_view(), name='note-list-create'),
    path('note/<int:pk>/', views.NoteDestroy.as_view(), name='note-destroy'),
    path('note/<int:pk>/update/', views.NoteUpdate.as_view(), name='note-update'),
]


