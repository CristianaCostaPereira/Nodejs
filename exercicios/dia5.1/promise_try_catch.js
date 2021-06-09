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

async function main() {
  try {
    const result = await db.query(false)

    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

main()