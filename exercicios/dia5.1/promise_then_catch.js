const db = {
  query(query) {
    return new Promise((resolve, reject) => {
      if (query) {
        resolve(5)
      } else {
        reject('Invalid query')
      }
    })
  }
}

function main() {
  db.query(false)
  .then((results) => {
    console.log(results)
  })
  .catch((error) => {
    console.log(error)
  })
}

main()