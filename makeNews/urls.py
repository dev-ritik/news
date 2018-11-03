from django.urls import path
from makeNews import views

urlpatterns = [
    path('', views.index, name='index'),
    path('error/', views.error, name='error'),
    path('toi/<slug:foo>', views.page, name='page'),
]
