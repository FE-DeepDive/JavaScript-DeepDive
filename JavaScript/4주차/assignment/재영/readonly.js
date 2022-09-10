const readonly = (object) => {
  if (object?.constructor?.name !== 'Object' && object?.constructor?.name !== 'Array') return object;
  
  
  for (const key in object) {
    object[key] = readonly(object[key]);
  }

  object = Object.freeze(object);

  return object;
}

export default readonly;