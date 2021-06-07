
// // app.post('/users', (req, res) => {
// //   const data = req.body

// //   const rules = {
// //     name: 'required',
// //     email: 'required|email',
// //     username: 'required|alphaNumeric',
// //     active: 'boolean',
// //     phone: [
// //       validations.required,
// //       validations.regex(['^((\\+|00)\\d{1,3}\\s{1})?\\d{9}$']),
// //     ],
// //   }

// //   const sanitizationRules = {
// //     name: 'trim|escape|strip_tags',
// //     username: 'lowerCase|escape|strip_tags',
// //     email: 'lowercase|escape|strip_tags',
// //     active: 'escape|strip_tags',
// //     phone: 'escape|strip_tags',
// //   }

// //   validate(data, rules, sanitizationRules)
// //     .then((value) => {
// //       sanitize(value, sanitizationRules)
      
// //       res.send(value)
// //     }).catch((error) => {
// //       res.status(400).send(error)
// //     })
// // })