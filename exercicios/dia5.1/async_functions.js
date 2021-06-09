async function foo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('foo')
      
      resolve()
    }, 1000)
  })
}

function bar() {
  setTimeout(() => {
    console.log('bar')
  }, 1000)
}

async function main() {
  /* foo().then(() => {
    bar()
  }) */
  
  foo()
  bar()
}

main()