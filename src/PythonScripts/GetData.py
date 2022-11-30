#!/usr/bin/python3
# This script is used to download a random video from pexels and pixabay and to download a random quote from forismatic
import random
import requests
import json

headers = {'Authorization': '563492ad6f91700001000001491ff09e5b194ec5bbf3c33fc9c4edb1'}


# Pexels api call to get random popular video
def get_random_video_from_pexels():
    url = 'https://api.pexels.com/videos/popular?per_page=80'
    response = requests.get(url, headers=headers)
    # Write the response code to the console
    return response.status_code


# PixaBay api call to get random popular video
def get_random_video_from_pixabay():
    # To change the theme of the video, change the keyword at the end of the url
    url = 'https://pixabay.com/api/videos/?key=31722829-cfc0478a353e311f83b8bcc56&q=landscape'
    response = requests.get(url)
    # Dump the response to a json file
    Json = response.json()

    # Here the index of the video is chosen randomly
    # We create a list with index of videos that are longer than 20 seconds and we will pick a random index from that list
    index_list = []
    for i in range(len(Json['hits'])):
        if Json['hits'][i]['duration'] > 20:
            index_list.append(i)
    index = random.choice(index_list)
    Url = Json['hits'][index]['videos']['large']['url']

    # Download the video to the current directory
    r = requests.get(Url, allow_redirects=True)
    open('public/video.mp4', 'wb').write(r.content)
    print(index)
    return "Response code is: " + str(response.status_code)


# Get random quote and author from forismatic
def get_random_quote():
    url = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'
    response = requests.get(url)
    Json = response.json()
    quote = Json['quoteText']
    author = Json['quoteAuthor']
    # write the quote and author to a json file
    with open('public/quote.json', 'w') as f:
        json.dump({
            'quote': quote,
            'author': author
        }, f, indent=4)
    return "Response code is: " + str(response.status_code)


print(get_random_video_from_pixabay())
print(get_random_quote())
