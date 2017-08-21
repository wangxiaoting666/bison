package com.wonderland.sail.util;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.*;

/**
 * @author lzg
 */
public class ExcelUtil {
    /**
     * 将excel的数字转换成字母（列号）
     *
     * @param index
     * @return String
     * @since 2.0.0
     */
    public static String excelIndexToLetter(int index) {
        String letter = "";
        int remainder = index % 26;
        letter = ((char) (remainder + (int) 'A')) + letter;
        index = (index - remainder) / 26;
        while (index > 0) {
            index--;
            remainder = index % 26;
            index = (index - remainder) / 26;
            letter = ((char) (remainder + (int) 'A')) + letter;
        }
        return letter;
    }

    /**
     * excel 导入
     * @filePath 文件路径
     */
    public static String importExcelXls(String filePath) throws IOException {

        File file = new File(filePath);
        POIFSFileSystem poifsFileSystem = new POIFSFileSystem(new FileInputStream(file));
        HSSFWorkbook hssfWorkbook = new HSSFWorkbook(poifsFileSystem);
        HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(0);

        int rowstart = hssfSheet.getFirstRowNum();
        int rowEnd = hssfSheet.getLastRowNum();
        for (int i = rowstart; i <= rowEnd; i++) {
            HSSFRow row = hssfSheet.getRow(i);
            if (null == row) continue;
            int cellStart = row.getFirstCellNum();
            int cellEnd = row.getLastCellNum();

            for (int k = cellStart; k <= cellEnd; k++) {
                HSSFCell cell = row.getCell(k);
                if (null == cell) continue;
                System.out.print("" + k + "  ");
                //System.out.print("type:"+cell.getCellType());

                switch (cell.getCellType()) {
                    case HSSFCell.CELL_TYPE_NUMERIC: // 数字
                        System.out.print(cell.getNumericCellValue()
                                + "   ");
                        break;
                    case HSSFCell.CELL_TYPE_STRING: // 字符串
                        System.out.print(cell.getStringCellValue()
                                + "   ");
                        break;
                    case HSSFCell.CELL_TYPE_BOOLEAN: // Boolean
                        System.out.println(cell.getBooleanCellValue()
                                + "   ");
                        break;
                    case HSSFCell.CELL_TYPE_FORMULA: // 公式
                        System.out.print(cell.getCellFormula() + "   ");
                        break;
                    case HSSFCell.CELL_TYPE_BLANK: // 空值
                        System.out.println(" ");
                        break;
                    case HSSFCell.CELL_TYPE_ERROR: // 故障
                        System.out.println(" ");
                        break;
                    default:
                        System.out.print("未知类型   ");
                        break;
                }

            }
            System.out.print("\n");
        }
        return "";
    }

    /**
     * excel 导入
     * @filePath 文件路径
     */
    public static String importExcelXlsx(String filePath) throws IOException, InvalidFormatException {

        File file = new File(filePath);

        XSSFWorkbook xssfWorkbook = new XSSFWorkbook(file);
        XSSFSheet xssfSheet = xssfWorkbook.getSheetAt(0);

        int rowstart = xssfSheet.getFirstRowNum();
        int rowEnd = xssfSheet.getLastRowNum();
        for(int i=rowstart;i<=rowEnd;i++)
        {
            XSSFRow row = xssfSheet.getRow(i);
            if(null == row) continue;
            int cellStart = row.getFirstCellNum();
            int cellEnd = row.getLastCellNum();

            for(int k=cellStart;k<=cellEnd;k++)
            {
                XSSFCell cell = row.getCell(k);
                if(null==cell) continue;

                switch (cell.getCellType())
                {
                    case HSSFCell.CELL_TYPE_NUMERIC: // 数字
                        System.out.print(cell.getNumericCellValue()
                                + "   ");
                        break;
                    case HSSFCell.CELL_TYPE_STRING: // 字符串
                        System.out.print(cell.getStringCellValue()
                                + "   ");
                        break;
                    case HSSFCell.CELL_TYPE_BOOLEAN: // Boolean
                        System.out.println(cell.getBooleanCellValue()
                                + "   ");
                        break;
                    case HSSFCell.CELL_TYPE_FORMULA: // 公式
                        System.out.print(cell.getCellFormula() + "   ");
                        break;
                    case HSSFCell.CELL_TYPE_BLANK: // 空值
                        System.out.println(" ");
                        break;
                    case HSSFCell.CELL_TYPE_ERROR: // 故障
                        System.out.println(" ");
                        break;
                    default:
                        System.out.print("未知类型   ");
                        break;
                }

            }
            System.out.print("\n");
        }
        return "";
    }

    /**
     * excel 导出
     * @param
     * @return

    public static String outPutExcel(String filePath){
        HSSFWorkbook workbook = null;
        workbook = new HSSFWorkbook();
        //获取参数个数作为excel列数
        int columeCount = 6;
        //获取List size作为excel行数
        int rowCount = 20;
        HSSFSheet sheet = workbook.createSheet("sheet name");
        //创建第一栏
        HSSFRow headRow = sheet.createRow(0);
        String[] titleArray = {"id", "name", "age", "email", "address", "phone"};
        for(int m=0;m<=columeCount-1;m++)
        {
            HSSFCell cell = headRow.createCell(m);
            cell.setCellType(HSSFCell.CELL_TYPE_STRING);
            sheet.setColumnWidth(m, 6000);
            HSSFCellStyle style = workbook.createCellStyle();
            HSSFFont font = workbook.createFont();
            font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
            short color = HSSFColor.RED.index;
            font.setColor(color);
            style.setFont(font);
            //填写数据
            cell.setCellStyle(style);
            cell.setCellValue(titleArray[m]);

        }
        int index = 0;
        //写入数据
        for(RowEntity entity : pRowEntityList)
        {
            //logger.info("写入一行");
            HSSFRow row = sheet.createRow(index+1);
            for(int n=0;n<=columeCount-1;n++)
                row.createCell(n);
            row.getCell(0).setCellValue(entity.getId());
            row.getCell(1).setCellValue(entity.getName());
            row.getCell(2).setCellValue(entity.getAge());
            row.getCell(3).setCellValue(entity.getEmail());
            row.getCell(4).setCellValue(entity.getAddress());
            row.getCell(5).setCellValue(entity.getPhone());
            index++;
        }

        //写到磁盘上
        try {
            FileOutputStream fileOutputStream = new FileOutputStream(new File(filePath));
            workbook.write(fileOutputStream);
            fileOutputStream.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return  "";
    }
     */
    public static void main(String args[]){
        long startTime=System.currentTimeMillis();   //获取开始时间


        try {
            importExcelXls("D:\\1111.xls");
        } catch (IOException e) {
            e.printStackTrace();
        }
        long endTime=System.currentTimeMillis(); //获取结束时间

        System.out.println("程序运行时间： "+(endTime-startTime)+"ms");
    }

}
