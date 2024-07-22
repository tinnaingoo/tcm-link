Attribute VB_Name = "DeleteAllShapes"
Sub DeleteAllShapes()
    Dim shp As Shape
    Dim ws As Worksheet
    For Each ws In ActiveWorkbook.Worksheets
        For Each shp In ws.Shapes
            shp.Delete
        Next shp
    Next ws
End Sub

