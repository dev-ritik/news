from django.shortcuts import render

# Create your views here.
from django.views import generic

from makeNews.models import FakeNews


def index(request):
    fakenews = FakeNews.objects.filter()[:1].get()
    """View function for home page of site."""
    print(fakenews)
    print("here")
    # Render the HTML template index.html with the data in the context variable
    return render(request, 'toi.html', context={'fakeNews': fakenews})


def Page(request, foo):
    print(foo)
    print("page")
    model = FakeNews

    for item in FakeNews.objects.all():
        print("listt")

    # fakenews = FakeNews.objects.filter(highlight2=foo)
    # print(fakenews)

    try:
        fakenews = FakeNews.objects.get(highlight2=foo)
        print(fakenews)
    except FakeNews.DoesNotExist:
        raise Http404('FakeNews does not exist')

    return render(request, 'toi.html', context={'fakeNews': fakenews})


# print("here page")
# model = FakeNews
#
# print(foo)
# try:
#     fakenews = FakeNews.objects.get(highlight2=foo)
# except FakeNews.DoesNotExist:
#     raise Http404('FakeNews does not exist')
#
# return render(request, 'toi.html', context={'fakeNews': fakenews})


class Toi(generic.DetailView):
    print("here1")
    model = FakeNews

    def news_display_view(request, foo):
        print(foo)
        print("news_display_view")
        try:
            fakenews = FakeNews.objects.get(highlight2=foo)
        except FakeNews.DoesNotExist:
            raise Http404('FakeNews does not exist')

        return render(request, 'toi.html', context={'fakeNews': fakenews})
