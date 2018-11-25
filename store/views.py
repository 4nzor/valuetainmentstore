from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from store.models import Product, Style, PrImage, GuestUser

# Create your views here.

MENU = {'man': Style.objects.filter(sex__sex='men'),
        'woman': Style.objects.filter(sex__sex='women'),
        'kid': Style.objects.filter(sex__sex='kid'),
        }


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def index(request):
    try:
        GuestUser.objects.get(ip=get_client_ip(request))
    except GuestUser.DoesNotExist:
        GuestUser.objects.create(ip=get_client_ip(request), cookie='0')
    return render(request, 'index2.html', dict({'product': Product.objects.all()}, **MENU))


class ProductPage(View):
    def get(self, request, product_id, photo_id):
        product = get_object_or_404(Product, id=product_id)
        main_image = PrImage.objects.get(id=photo_id)
        images = PrImage.objects.exclude(id=photo_id)
        images = images.filter(product__id=product_id)
        request.session[0] = 'bar'
        print(request.session[0])
        return render(
            request, 'product_page.html', dict({
                'product': product,
                'main_image': main_image,
                'images': images,
                'products': Product.objects.all()}, **MENU))

    def post(self, request, product_id, photo_id):
        print(request.POST)
        return JsonResponse({})


def colletions(request, gender, style):
    args = Style.objects.filter(sex__sex=gender)
    products = Product.objects.filter(sex__sex=gender, style__style=style)
    imgs = PrImage.objects.filter(product__sex__sex=gender, product__style__style=style)
    main_image = PrImage.objects.filter(product__sex__sex=gender, product__style__style=style).first()
    filter_gender = ''
    if gender == 'men':
        filter_gender = 'мужчина'
    if gender == 'women':
        filter_gender = 'женщина'
    cntxt = dict({'args': args,
                  'filter_gend': filter_gender,
                  'products': products,
                  'imgs': imgs,
                  'main_image': main_image
                  }, **MENU)
    return render(request, 'collections.html', cntxt)


@csrf_exempt
def set_cookie(request):
    ip = get_client_ip(request)
    user = GuestUser.objects.get(ip=ip)
    user.cookie = request.POST.get('value')
    print(request.POST.get('value'))
    user.save()
    return JsonResponse({})


def get_cookie(request):
    ip = get_client_ip(request)
    user = GuestUser.objects.get(ip=ip)
    print(user.cookie)
    return JsonResponse({'value': user.cookie})
