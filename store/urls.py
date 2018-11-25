from django.urls import path

from store import views

urlpatterns = [

    path('', views.index, name='index'),
    path('products/<product_id>/<photo_id>/', views.ProductPage.as_view(), name='product_page'),
    path('collections/<gender>/<style>/', views.colletions, name='collections'),
    path('get_cookie/', views.get_cookie),
    path('set_cookie/', views.set_cookie),
]
