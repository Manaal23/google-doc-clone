import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import Nav from "../../components/Nav"

const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

export default function TextEditor() {
  const { id: documentId } = useParams()
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()
  const [showSaving, setShowSaving] = useState(false)
  const [title, setTitle] = useState('Document')
  
  useEffect(() => {
    const s = io(process.env.REACT_APP_BACKEND_URL)
    setSocket(s)
    
    return () => {
      s.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket == null || quill == null) return

    socket.once("load-document", document => {
      quill.setContents(document.data)

      setTitle(document.title)
      quill.enable()
    })

    let userData = JSON.parse(localStorage.getItem('userData'))
    socket.emit("get-document", {documentId, userId : userData.id})
  }, [socket, quill, documentId])

  useEffect(() => {
    if (socket == null || quill == null) return

    // const interval = setInterval(() => {
    //   socket.emit("save-document", quill.getContents())
    // }, SAVE_INTERVAL_MS)

    return () => {
      // clearInterval(interval)
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = delta => {
      quill.updateContents(delta)
    }
    socket.on("receive-changes", handler)

    return () => {
      socket.off("receive-changes", handler)
    }
  }, [socket, quill])

  let timeoutId, showSaveTimeOut;
  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta, oldDelta, source) => {

      if (source !== "user") return
      socket.emit("send-changes", delta)
      
      clearTimeout(timeoutId)
      clearTimeout(showSaveTimeOut)
      showSaveTimeOut = setTimeout(() => {
        setShowSaving(false)
      }, 4000)

      timeoutId = setTimeout(() => {
        setShowSaving(true)
        socket.emit("save-document", quill.getContents(), title)
      }, 1000)
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill, title])

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    })
    q.disable()
    q.setText("Loading...")
    setQuill(q)
  }, [])

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleBlur = () => {
    if (!title.trim())
    setTitle('Untitle Document')

    clearTimeout(showSaveTimeOut)
    showSaveTimeOut = setTimeout(() => {
      setShowSaving(false)
    }, 4000)

    setShowSaving(true)
    socket.emit("save-document", quill.getContents(), !title.trim() ? 'Untitle Document' : title)
  };

  return <>
          <Nav title={title} setTitle={setTitle} handleTitleChange={handleTitleChange} handleBlur={handleBlur} showShare={true} showSaving={showSaving}/>
  <div className="container" ref={wrapperRef}></div>
  </>
}
