function ArxivSlack() {
    // change your bot token
    var TOKEN = 'xoxb-***-***';

    // spreadsheetinformation
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    var data = sheet.getRange(1, 1, sheet.getLastRow(), 4).getValues();

    for (var i = 0; i < data.length; i++) {
        var keyword = data[i][0];
        var feedURL = data[i][1];
        var channel = data[i][2];
        var lastFetched = data[i][3];

        // Fetch
        try {
            var rssText = UrlFetchApp.fetch(feedURL).getContentText();
        } catch (e) {
            continue;
        }

        // Parse
        var items = Parser.data(rssText).from('<item>').to('</item>').iterate();

        var news = [];
        for each(var item in items) {
            if (lastFetched.indexOf(Parser.data(item).from('guid isPermaLink="false">').to('</guid>'))) {
                news.push(item);
            }
        }
        
        if (news.length > 0) {
            var att = [];
            var req = /\(.+\)/;
            var req1 = /&lt.*&gt;/;
            for each(var item in news) {
                var title_more = Parser.data(item).from('<title>').to('</title>').build();
                // title
                var title = title_more.replace(req,'');
                // link
                var link = Parser.data(item).from('<link>').to('</link>').build();
                // description
                var desc = Parser.data(item).from('<description>').to('</description>').build();
                var description = desc.replace(/&lt.*&gt;/g,'');
                // title,description traslate
                var translatedtitle = LanguageApp.translate(title, "en", "ja");
                var translateddesc = LanguageApp.translate(description, "en", "ja");
                // Allinformationpush_toatt
                att.push({
                    title: translatedtitle,
                    title_link: link,
                    text: translateddesc,
                });
            }
            // Post
            var app = SlackApp.create(TOKEN);
            var message = 'Here are new papers for *"' + keyword + '"* :eyes:';
            app.postMessage(channel, message, {
                username: keyword,
                icon_emoji: ':rolled_up_newspaper:',
                attachments: JSON.stringify(att),
            });
        }
    }
}
