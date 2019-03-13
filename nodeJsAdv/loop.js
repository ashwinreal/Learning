// node index.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations= [];

// New Timers, tasks, operations are recorded from myFile running
myFile.runContents();

function shouldContinue(){
    // check one  : Any pending setTimeout, setInterval, setImmediate
    // check two  : Any pending OS tasks ex: server listening to some port, networking // threading in OS level 
    // check three: Any pending long running tasks ex: like fs module // operation that make use of the thread pool of the libuv

    return pendingOperations.length || pendingOSTasks.length || pendingTimers.length;
}
// entire body executes in one `tick`
while(shouldContinue()){
    // 1) Node looks at pending timers(setTimout and setInterval only) and 
    // sees if any functions are ready to be called

    // 2) Node looks at any pendingOStasks, pendingOperations and executes the relevant callbacks

    // 3) Pause execution. Continue when
    //      - a new pendingOStask  is done
    //      - a new pendingOperation is done
    //      - a timer is about to be completed.

    // 4) Look at pending timers. Call any setImmediate

    // 5) Handle any close

}

// exit back to terminal