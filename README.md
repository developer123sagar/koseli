## Dashboard

create watcher ko laii user management ko add new mah rakhni


### Architecture chat 

user ----> placesOrder ----> restaurant (acknowledges)
restaurant (acknowledge) ---> default message to Socket directed towards that user, default message to database 
both can chat
# chat(entity recieves message)
entity opens chat page ---> data fetched from the database where socket still listening
any chat on listen, data pops up in real time.
# chat(entity sends message)
chat pops up in UI, directed via socket, saved to db  


# Test conversations 

sagar : 651e6bc90ad4b3e3b98a6090
Vanjha ghar : 651d641cb2bcc984c536a1ab