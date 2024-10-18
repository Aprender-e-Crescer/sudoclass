interface Props {
  name: string
  rating: string
  overallRating: string
}

export function NotesTable({name, rating, overallRating}: Props): void {
  <div className="flex h-screen">    
        <tbody>
          <tr>
            <td className="border border-[#DBDBDB] px-20 py-6">{name}</td>
            <td className="border border-[#DBDBDB] w-52 px-20 py-6">{rating}</td>
            <td className="border border-[#DBDBDB] w-52 px-20 py-6">{overallRating}</td>
          </tr>
        </tbody>
  </div>      

}