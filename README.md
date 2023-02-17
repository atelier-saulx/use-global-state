# useGlobalState

works like useState but then with a key that can be used globally.

```js
import useGlobalState from '@based/use-global-state'

const MyComp = () => {
  const [count, setCount] = useGlobalState('counter')
  
  return <div onClick={()=>setCount(Math.random())}> Hello {count}</div

}
```
