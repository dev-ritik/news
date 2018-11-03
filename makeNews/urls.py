from django.urls import path
from makeNews import views

urlpatterns = [
    path('', views.index, name='index'),
    # path('toi/<slug:foo>', views.Toi.as_view(), name='news-display'),
    path('toi/<slug:foo>', views.Page, name='page'),
]
