from django.shortcuts import render, get_object_or_404

from store.models import Product


# Create your views here.


def index(request):
    return render(request, 'index2.html', {'product': Product.objects.all()})


def product_page(request, product_id):
    product = get_object_or_404(Product,id=product_id)
    return render(
        request, 'product_page.html', {
            'product': product,
            'products': Product.objects.all()})
