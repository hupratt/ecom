# Ecom web application

## Architecture

- Ecom is a django single page (SPA) web app running on apache as a web server.
- Apache proxies requests to the uWSGI application which invokes the python application itself. uWSGI was chosen so that we could increase the number of processes on demand.
- Apache caches the pages on the loadbalancer's server to avoid database accesses as much as possible
- The latest multiprocessing apache module is used to create parallel replicas of our app. Each apache "event_worker" is 1 process and 1 python app. 1 process launches multiple threads so that each app is concurrently accessed by multiple users. The big performance advantage of the "event_worker" over the regular worker is that once the connection is idle, the thread gives back the control of the socket to Apache.
- There is a full decoupling of the front end with React written in JSX which is then tranpiled to vanilla javascript through the dev and build scripts specified in the package.json file.
- React components live in the "ecom/frontend" django app. Redux is extensively used to manage state in order to guarantee a single source of truth and avoid having the multiple components managing state. Each component gets the state as props from the store.
- A load balancer sitting in front of the servers distributes tasks using a round robin scheduler. This setup mitigates timeouts and ensures failover as there is always a server that can handle incoming requests without having to upgrade our bandwidth to a more expensive tier with our cloud provider. Further improvements to the set up will include: request compression
- The continuous delivery pipeline is triggered by a git push to origin by any member that has write access to this repo.
- The git push triggers a webhook where both github and jenkins are listening on in order to build the jenkins pipeline.
- Specifications of the Jenkinsfile can be found above.
- Any push to origin will trigger both webhooks however jenkins will only build the source code located in the "master" branch.

## Features

- [x] Secure emailing with analytics: sending emails with sendgrid's service using a Recaptcha secured form
- [x] Feature 2
- [x] Feature 3

## Backend development workflow

```json
virtualenv -p python3.8 .
source bin/activate
pip install -r requirements.txt
python manage.py runserver
```

## Frontend development workflow

```json
npm i
npm run dev
```

## Ignore mypy stuff

```
echo '*' > .mypy_cache/.gitignore
```

REACT_APP_BASE=https://shop.lapetiteportugaise.eu
REACT_APP_BASE=http://127.0.0.1:8000

        # find element 'f-productSummary-readMore'
        # try:
        #     acceptbutton = driver.find_element_by_class_name('accept-cookies-button')
        #     driver.execute_script("window.scrollTo(0, 600)")
        #     time.sleep(2)
        #     acceptbutton.click()
        #     time.sleep(2)
        #     button = driver.find_element_by_class_name('f-productSummary-readMore')
        #     button.click()

        # except NoSuchElementException:
        #     pass
        # except ElementNotVisibleException:
        #     pass
        # text = soup.findAll("span", {"class":"js-ProductSummary-truncate"})[0].contents[0]
