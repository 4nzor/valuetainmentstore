from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt

from store.models import Product


def index(request):
    return render(request,'index2.html',{'product':Product.objects.all()})

def product_page(request):
    return render(request, 'product_page.html', {'product': Product.objects.all()})

@csrf_exempt
def gg(request):
    return JsonResponse({"id":17850895630395,"properties":None,"quantity":1,"variant_id":17850895630395,"key":"17850895630395:3b6f9a03b3d3a86ee8e22d5269b771ac","title":"Valuetainment I Am Texas B WHT - Kids T-Shirt \/ Tri Gray \/ 4-5Y","price":1899,"original_price":1899,"discounted_price":1899,"line_price":1899,"original_line_price":1899,"total_discount":0,"discounts":[],"sku":"C-C-UKDTTRG-XX-0076-002-15-BST","grams":74,"vendor":"Valuetainment","taxable":True,"product_id":1829001134139,"gift_card":False,"url":"\/products\/valuetainment-youth-t-shirt-valuetainment-companies-15?variant=17850895630395","image":"https:\/\/cdn.shopify.com\/s\/files\/1\/2304\/3009\/products\/Kids-T-Shirt-Tri-Gray_c1330998-bd55-484e-b077-5e239276f471.jpg?v=1540995535","handle":"valuetainment-youth-t-shirt-valuetainment-companies-15","requires_shipping":True,"product_type":"Kids T-Shirt","product_title":"Valuetainment I Am Texas B WHT","product_description":"The ultimate in comfort and intensely soft, our Premium Tri-Blend Kids T-Shirt is one of our newest styles! This vintage graphic tee has knitted striations similar to your comfy P.E. T-Shirts when you were young.\r\n\r\nRegular Fit\r\nTri-Colors - 50% Polyester \/ 25% Cotton \/ 25% Rayon\r\nHeather Colors - 60% Cotton \/ 40% Polyester\r\nKids Crewneck Short Sleeve T-Shirt\r\nDigitally Printed Graphics\r\nMachine Wash Cold, Tumble Dry Low\r\n","variant_title":"Kids T-Shirt \/ Tri Gray \/ 4-5Y","variant_options":["Kids T-Shirt","Tri Gray","4-5Y"]})