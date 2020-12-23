export default class DocumentUtil {
  public static inserNode(e: HTMLElement, html: string) {
    if (e !== document.activeElement) {
      e.focus()
    }
    const selection = getSelection()
    const createRange = document.createRange()
    const rangeCount = selection ? selection.rangeCount : 0;
    if (selection && rangeCount > 0 && selection.getRangeAt) {
      let range = selection.getRangeAt(0)
      if (!range) {
        range = createRange
      } else {
        let div = document.createElement('div')
        div.innerHTML = html
        let list: Node[] = []
        for (const node of div.childNodes) {
          list.push(node)
        }
        let node;
        for (const n of list) {
          node = n
          range.insertNode(n)
        }
        if (node) {
          range.setStartAfter(node);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }
  }
}