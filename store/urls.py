from django.urls import path

from store import views

urlpatterns = [

    path('', views.index, name='index'),
    path('products/', views.product_page, name='product_page'),
    path('cart/add.js',views.gg, name='product_page'),
    path('cart.js',views.gg)


]
