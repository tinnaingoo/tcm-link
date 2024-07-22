Attribute VB_Name = "DeleteAlTextBoxs"
Sub DeleteAllTextboxes()
    Dim shp As Shape
    Dim ws As Worksheet
    For Each ws In ActiveWorkbook.Worksheets
        For Each shp In ws.Shapes
            If shp.Type = msoTextBox Then
                shp.Delete
            End If
        Next shp
    Next ws
End Sub

