import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props){ super(props); this.state = { hasError: false } }
  static getDerivedStateFromError(){ return { hasError: true } }
  componentDidCatch(err, info){ console.error(err, info) }
  render(){
    if(this.state.hasError){
      return <div className="p-6 max-w-xl mx-auto bg-white border rounded">Something went wrong.</div>
    }
    return this.props.children
  }
}
