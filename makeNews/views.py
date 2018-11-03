from datetime import datetime

from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.urls import reverse
from django.views import generic
from django.http import HttpResponseRedirect

from makeNews.forms import NewNewsForm
from makeNews.models import FakeNews


def index(request):
    # If this is a POST request then process the Form data
    book_instance = get_object_or_404(FakeNews)
    if request.method == 'POST':

        # Create a form instance and populate it with data from the request (binding):
        new_news_form = NewNewsForm(request.POST)

        # Check if the form is valid:
        if new_news_form.is_valid():
            # process the data in form.cleaned_data as required (here we just write it to the model due_back field)
            # book_instance.due_back = new_news_form.cleaned_data['renewal_date']
            # book_instance.save()

            print("valid!!!")
            # redirect to a new URL:
            return HttpResponseRedirect(reverse('all-borrowed'))

    # If this is a GET (or any other method) create the default form.
    else:
        time_now = datetime.now()
        new_news_form = NewNewsForm(initial={'renewal_date': time_now})

    context = {
        'form': new_news_form,
        'book_instance': book_instance,
    }

    return render(request, 'new_news_form.html', context)


    # return render(request, 'index.html', context={'fakeNews': 1})


def error(request):
    return render(request, '404error.html', context={'fakeNews': 1})


def page(request, foo):
    print(foo)
    print("page")

    try:
        fakenews = FakeNews.objects.get(highlight2=foo)
    except FakeNews.DoesNotExist:
        return HttpResponseRedirect('/makeNews/error/')

    return render(request, 'toi.html', context={'fakeNews': fakenews})


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
