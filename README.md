Dear Sir or Madam:
    Now you may endure my Chinese English.So first Say : "Sorry".
    Because I just study 'node.js' two days, so a lot of codes may simple. I usually coding 'c++/C#' , so I use many class, not function of 'node.js'.
    I change Structure of this project.
    --client/
    ----message/
    ----client.js

    --common/

    --server/
    ----data/
    ----manager/
    ----message/
    ----server.js

    --test

    --txt

    If you want start server, please run `node server.js` in terminal.
    If you want start client, please run `node client.js` in terminal.

    
    Common folder is Client and server common components.
    Txt folder is txt or config file.
    As net-frame, I use Common MessageFactory and MessageDispatcher(Subscribe/Publish). Now use json as message,but if as a TCPServer, I will use protobuff.
    Client doing：
    1.Input Name Connect Server 
    2.Connect OK Send login To Server
    3.While{ Input Message And Send Message}

    Server doing:
    1.Init Other Manager 
    2.Start Web Server
    3.Wait Client Msg And Handle Msg
    4.Timer Static Word Num
    5.Manager Player
    6.Profanity Word

    nmp use ws todo websever
    nmp use ava todo test
    
    I only use nodejs two days, not use ava or other. I want try ava,but output error ava, I donot know.

    Thank you！