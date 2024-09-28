import os
import requests
import time

def ping_url(url, delay, max_trials):
    number_of_trials = 0
    while(number_of_trials < max_trials):
        try:
            response = requests.get(url)
            if response.status_code == 200:
                print(f"Website {url} is reachable")
                return True
        except requests.ConnectionError:
            print(f"Website {url} is unreachable. Wating {delay} seconds before trying again.")
            number_of_trials += 1
            time.sleep(delay)
            
    return False

def run():
    website_url = os.environ['INPUT_URL']
    delay = int(os.environ['INPUT_DELAY'])
    max_trials = int(os.environ['INPUT_MAX_TRIALS'])
    isWebsiteReachable = ping_url(website_url, delay, max_trials)
    file = open(os.environ['GITHUB_OUTPUT'], 'a')
    if not isWebsiteReachable:
        print(f"url_reachable={isWebsiteReachable}", file=file)
        raise Exception(f"Website {website_url} is unreachable or malformed.")
    print(f"url_reachable={isWebsiteReachable}", file=file)

if __name__ == '__main__':
    run()