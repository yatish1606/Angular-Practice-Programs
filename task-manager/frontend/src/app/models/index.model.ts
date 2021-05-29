export class List {
    _id: string
    title: string
}

export class Task {
    _id: string
    title: string
    _listID: string
    completed: boolean
}