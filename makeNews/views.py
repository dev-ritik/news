from datetime import datetime

from django.shortcuts import render
from django.views import generic
from django.http import HttpResponseRedirect

from makeNews.forms import NewNewsForm
from makeNews.models import FakeNews
from urllib.parse import unquote


def index(request):
    return render(request, 'welcome.html')


def makeNews(request):
    # If this is a POST request then process the Form data
    newNews = FakeNews()
    print("index")

    if request.method == 'POST':
        print("post")
        # Create a form instance and populate it with data from the request (binding):
        new_news_form = NewNewsForm(request.POST)
        print(new_news_form.errors)
        print(new_news_form.error_class)
        print(new_news_form.is_valid())
        # Check if the form is valid:
        if new_news_form.is_valid():
            # process the data in form.cleaned_data as required (here we just write it to the model due_back field)
            newNews = FakeNews()
            newNews.highlight1 = new_news_form.cleaned_data['highlight1']
            newNews.highlight2 = new_news_form.cleaned_data['highlight2']
            newNews.link = new_news_form.cleaned_data['link']
            newNews.newsContent = new_news_form.cleaned_data['news_content']
            newNews.headline = new_news_form.cleaned_data['headline']
            newNews.date = datetime.now()
            newNews.place = new_news_form.cleaned_data['place']
            newNews.author = new_news_form.cleaned_data['author']
            newNews.imageCaption = new_news_form.cleaned_data['imageCaption']
            newNews.imageUrl = new_news_form.cleaned_data['imageUrl']
            newNews.save()

            headlineurl = newNews.headline.replace(' ', '-')
            urlcode = headlineurl
            print("valid!!!")
            # redirect to a new URL:
            return HttpResponseRedirect('/makeNews/toi/' + urlcode)

    # If this is a GET (or any other method) create the default form.
    else:
        print("get")
        time_now = datetime.now()
        new_news_form = NewNewsForm(initial={'renewal_date': time_now})

    context = {
        'form': new_news_form,
        'fake_news': newNews,
    }
    print("return")
    return render(request, 'new_news_form.html', context)


def error(request):
    return render(request, '404error.html', context={'fakeNews': 1})


def page(request, slug):
    print(slug)

    input = unquote(slug)
    headline = input.replace('-', ' ')

    print(headline)
    # if not isinstance(time, datetime.datetime):
    #     return HttpResponseRedirect('/makeNews/error/')

    try:
        fakenews = FakeNews.objects.get(headline=headline)
    except FakeNews.DoesNotExist:
        return HttpResponseRedirect('/makeNews/error/')

    return render(request, 'toi.html', context={'fakeNews': fakenews})


class Toi(generic.DetailView):
    model = FakeNews

    def news_display_view(request, slug):
        print(slug)
        try:
            fakenews = FakeNews.objects.get(highlight2=slug)
        except FakeNews.DoesNotExist:
            raise Http404('FakeNews does not exist')

        return render(request, 'toi.html', context={'fakeNews': fakenews})
