const to = promiseObj => {
  const newPromise = promiseObj.then(res => {
    return [null, res]
  }).catch(err => {
    return [err, null]
  })
  return newPromise
}

export default to
