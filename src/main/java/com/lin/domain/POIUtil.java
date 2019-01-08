package com.lin.domain;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class POIUtil {

	private Workbook wb;
	private Sheet sheet;
	private Row row;

	public static void importExcel() {

	}

	/**
	 * 璇诲彇Excel琛ㄦ牸琛ㄥご鐨勫唴瀹�
	 * 
	 * @param InputStream
	 * @return String 琛ㄥご鍐呭鐨勬暟缁�
	 */
	public String[] readExcelTitle(InputStream is, String fileName) {

		try {
			if (fileName.endsWith("xls")) {
				wb = new HSSFWorkbook(is);
			} else if (fileName.endsWith("xlsx")) {
				wb = new XSSFWorkbook(is);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		sheet = wb.getSheetAt(0);
		row = sheet.getRow(0);
		// 鏍囬鎬诲垪鏁�
		int colNum = row.getPhysicalNumberOfCells();
		System.out.println("colNum:" + colNum);
		String[] title = new String[colNum];
		for (int i = 0; i < colNum; i++) {
			title[i] = getCellFormatValue(row.getCell((short) i)).trim();
		}
		return title;
	}

	/**
	 * 瀵煎叆瑙ｆ瀽琛ㄥ唴瀹规柟娉�
	 * 
	 * @param is
	 * @param fileName
	 * @return
	 * @date Jan 4, 20181:45:46 PM
	 * @author dongpanhang
	 */
	public Map<Integer, List<String>> readExcelContent(InputStream is, String fileName) {
		Map<Integer, List<String>> content = new HashMap<Integer, List<String>>();
		try {
			if (fileName.endsWith("xls")) {
				wb = new HSSFWorkbook(is);
			} else if (fileName.endsWith("xlsx")) {
				wb = new XSSFWorkbook(is);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		sheet = wb.getSheetAt(0);
		// 寰楀埌鎬昏鏁�
		int rowNum = sheet.getLastRowNum();
		row = sheet.getRow(0);
		int colNum = row.getPhysicalNumberOfCells();
		// 姝ｆ枃鍐呭搴旇浠庣浜岃寮�濮�,绗竴琛屼负琛ㄥご鐨勬爣棰�
		for (int i = 1; i <= rowNum; i++) {
			row = sheet.getRow(i);
			if (row == null || row.getCell(0) == null) {
				continue;
			}
			int j = 0;
			List<String> dataList = new ArrayList<>();
			while (j < colNum) {
				System.out.println(j + "==" + i);
				dataList.add(getCellFormatValue(row.getCell((short) j)).toString().trim());
				j++;
			}
			content.put(i, dataList);
		}
		return content;
	}

	@SuppressWarnings("deprecation")
	private String getCellFormatValue(Cell cell) {
		String cellvalue = "";
		if (cell != null) {
			// 鍒ゆ柇褰撳墠Cell鐨凾ype
			switch (cell.getCellType()) {
			// 濡傛灉褰撳墠Cell鐨凾ype涓篘UMERIC
			case HSSFCell.CELL_TYPE_NUMERIC: {
				// 鍙栧緱褰撳墠Cell鐨勬暟鍊�
				// 杩欓噷鐨勬棩鏈熺被鍨嬩細琚浆鎹负鏁板瓧绫诲瀷锛岄渶瑕佸垽鍒悗鍖哄垎澶勭悊
				if (DateUtil.isCellDateFormatted(cell)) {
					Date date = cell.getDateCellValue();
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
					cellvalue = sdf.format(date);
				} else {
					BigDecimal big = new BigDecimal(cell.getNumericCellValue());
					cellvalue = big.toString();
				}
				break;
			}
			// case HSSFCell.CELL_TYPE_FORMULA: {
			// cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
			// // 鍒ゆ柇褰撳墠鐨刢ell鏄惁涓篋ate
			// if (HSSFDateUtil.isCellDateFormatted(cell)) {
			// // 濡傛灉鏄疍ate绫诲瀷鍒欙紝杞寲涓篋ata鏍煎紡
			// // 鏂规硶1锛氳繖鏍峰瓙鐨刣ata鏍煎紡鏄甫鏃跺垎绉掔殑锛�2011-10-12 0:00:00
			// // cellvalue = cell.getDateCellValue().toLocaleString();
			// // 鏂规硶2锛氳繖鏍峰瓙鐨刣ata鏍煎紡鏄笉甯﹀甫鏃跺垎绉掔殑锛�2011-10-12
			// Date date = cell.getDateCellValue();
			// SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			// cellvalue = sdf.format(date);
			// }
			// break;
			// }
			case HSSFCell.CELL_TYPE_FORMULA:
				cell.setCellType(HSSFCell.CELL_TYPE_STRING);
				cellvalue = cell.getStringCellValue();
				break;
			// 濡傛灉褰撳墠Cell鐨凾ype涓篠TRIN
			case HSSFCell.CELL_TYPE_STRING:
				// 鍙栧緱褰撳墠鐨凜ell瀛楃涓�
				cellvalue = cell.getRichStringCellValue().getString();
				break;
			// 榛樿鐨凜ell鍊�
			default:
				cellvalue = "";
			}
		} else {
			cellvalue = "";
		}
		return trim(cellvalue.trim());
	}
	
	public static String trim(String s) {
		String result = "";
		if (null != s && !"".equals(s)) {
			result = s.replaceAll("^[銆�*| *| *|\\s*]*", "").replaceAll("^[聽*| *| *|\\s*]*", "")
					.replaceAll("[銆�*| *| *|\\s*]*$", "").replaceAll("[聽*| *| *|\\s*]*$", "");
		}
		return result;
	}

}
