from django.urls import path
from makeNews import views


urlpatterns = [
    path('', views.index, name='index'),
]