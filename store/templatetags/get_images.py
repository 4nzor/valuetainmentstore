from django import template
from django.utils.html import format_html

from store.models import Product, PrImage

register = template.Library()


@register.simple_tag()
def get_rate(crit, title):
    product = Product.objects.get(id=crit, title=title).title
    image_url = PrImage.objects.filter(product__title=product)
    html_el = str()
    for image in image_url:
        html_el = html_el + '<label class="color number-1"' \
                  + 'style="cursor:pointer;background-size:contain; background-color: rgb' + \
                  str(image.get_color()) + ';">' \
                  + '<input class="imageSrc" type="hidden"' + \
                  ' value="' + image.image.url + '">' + \
                  '<input onclick="edit_href(' + str(image.id) + ',' + str(
            crit) + ')" type="radio" data-option-index="1" name="Color"' \
                  + 'value="Tri Ash"/>' + '</label>'
    return format_html(html_el)


@register.simple_tag(takes_context=True)
def active(context, url):
    if context.request.path == url:
        return 'on'


@register.simple_tag()
def get_main_image(id,message):
    main_image = PrImage.objects.filter(product_id=id).first()
    main_image_id = main_image.id

    if message == 1:
        return main_image_id

    else:
        return main_image.image.url
