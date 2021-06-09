const db = {
  query(query, callback) {
    if (query) {
      callback(undefined, 5)
    } else {
      callback('Error message')
    }
  }
}

function main() {
  db.query(false, (error, results) => {
    if (error) {
      throw error
    }
    
    console.log(results)
  })
}

main()