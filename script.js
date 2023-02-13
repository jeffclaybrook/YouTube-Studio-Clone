const getData = async () => {
    try {
        const res = await fetch('data.json');
        const data = await res.json();
        return data;
    } catch {
        console.log('Error fetching data');
    }
}

const createDashboard = async () => {
    const data = await getData();
    const dashboard = data.dashboard;

    dashboardHeader = () => {
        const totalSubscribers = document.getElementById('total-subscribers');
        totalSubscribers.innerText = dashboard.totalSubscribers;
    }

    channelAnalytics = () => {
        const { timeFrame, views, watchTime } = dashboard.channelAnalytics;
        const channelAnalyticsTimeframe = document.getElementById('channel-analytics-timeframe');
        const channelAnalyticsViews = document.getElementById('channel-analytics-views');
        const channelAnalyticsWatchTime = document.getElementById('channel-analytics-watch-time');
        channelAnalyticsTimeframe.innerText = timeFrame;
        channelAnalyticsViews.innerText = views;
        channelAnalyticsWatchTime.innerText = watchTime;
    }

    latestPublishedContent = () => {
        const content = dashboard.latestPublishedContent;
        const cards = document.querySelector('.latest-published-content .cards');
        content.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
            <div class="card-header">
                <img src="${item.thumbnail}" alt="${item.video}">
                <div class="wrapper">
                    <h4>${item.video}</h4>
                    <p>${item.timeFrame}</p>
                </div>
            </div>
            <div class="card-footer">
                <div class="stat">
                    <i class="material-symbols-outlined">bar_chart</i>
                    <h4>${item.views}</h4>
                </div>
                <div class="stat">
                    <i class="material-symbols-outlined">thumb_up</i>
                    <h4>${item.likes}</h4>
                </div>
                <div class="stat">
                    <i class="material-symbols-outlined">chat</i>
                    <h4>${item.comments}</h4>
                </div>
            </div>
            `;
            cards.appendChild(card);
        })
    }

    latestComments = () => {
        const content = dashboard.latestComments;
        const comments = content.comments;
        const card = document.querySelector('.latest-comments .card');
        const cardBody = document.querySelector('.latest-comments .card .card-body');
        const title = card.querySelector('.card-header h4');
        const image = card.querySelector('.card-header img');
        title.innerText = content.video;
        image.src = content.thumbnail;
        image.setAttribute('alt', `${content.video}`);
        comments.forEach(item => {
            const comment = document.createElement('div');
            comment.classList.add('comment');
            comment.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.user}">
            <div class="wrapper">
                <p>${item.user} • ${item.timeFrame}</p>
                <h4>${item.comment}</h4>
            </div>
            `;
            cardBody.appendChild(comment);
        })
    }

    dashboardHeader();
    channelAnalytics();
    latestPublishedContent();
    latestComments();
}

createDashboard()

const createContent = async () => {
    const data = await getData();
    const content = data.content;
    const cards = document.querySelector('.channel-content .cards');
    content.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.video}">
        <div class="wrapper">
            <h4>${item.video}</h4>
            <p>${item.views} views • ${item.published}</p>
            <div class="flex">
                <div class="stat">
                    <i class="material-symbols-outlined">public</i>
                </div>
                <div class="stat">
                    <i class="material-symbols-outlined">thumb_up</i>
                    <h4>${item.likes}</h4>
                </div>
                <div class="stat">
                    <i class="material-symbols-outlined">chat</i>
                    <h4>${item.comments}</h4>
                </div>
            </div>
        </div>
        `;
        cards.appendChild(card);
    })
}

createContent()

const navBar = () => {
    const tabs = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            tabs.forEach(tab => tab.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            tabs[i].classList.add('active');
            sections[i].classList.add('active');
        })
    })
}

navBar()