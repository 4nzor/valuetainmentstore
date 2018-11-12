from django.urls import path

from store import views

urlpatterns = [

    path('', views.index, name='index'),
    path('products/<product_id>/', views.product_page, name='product_page'),

]
